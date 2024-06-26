import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.cleverdev.videowiz",
  projectId: "661bcfefa28564acd407",
  databaseId: "661bd178841d3a479d63",
  usersCollectionId: "661bd196b7dc2c981449",
  videosCollectionId: "661bd1b6268996a5948a",
  storageId: "661bd3111b9e14e42674",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (name, email, password) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);

    if (!newAccount) {
      throw Error;
    }

    const avatarUrl = avatars.getInitials(name);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        name,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  const currentAccount = await account.get();

  if (!currentAccount) throw Error;

  const currentUser = await databases.listDocuments(
    config.databaseId,
    config.usersCollectionId,
    [Query.equal("accountId", currentAccount.$id)]
  );

  if (!currentUser) throw Error;

  return currentUser.documents[0];
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(5))]
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getSearchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videosCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const createVideoPost = async (
  title,
  prompt,
  video,
  thumbnail,
  userId
) => {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(thumbnail, "image"),
      uploadFile(video, "video"),
    ]);

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videosCollectionId,
      ID.unique(),
      {
        title: title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: prompt,
        creator: userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const getFavoritePosts = async (userId) => {
  try {
    const userDocument = await databases.getDocument(
      config.databaseId,
      config.usersCollectionId,
      userId
    );

    if (!userDocument) throw Error;

    return userDocument.likedVideos;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateFavorites = async (likedUsers, documentId) => {
  try {
    const videoDocument = await databases.updateDocument(
      config.databaseId,
      config.videosCollectionId,
      documentId,
      { likedUsers: likedUsers }
    );

    if (!videoDocument) throw Error;

    return videoDocument;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateVideoPost = async ({
  videoId,
  title,
  prompt,
  video,
  thumbnail,
}) => {
  try {
    let data = {};

    if (thumbnail && video) {
      const [thumbnailUrl, videoUrl] = await Promise.all([
        uploadFile(thumbnail, "image"),
        uploadFile(video, "video"),
      ]);

      data = {
        title,
        prompt,
        thumbnail: thumbnailUrl,
        video: videoUrl,
      };
    }

    if (thumbnail) {
      const [thumbnailUrl] = await Promise.all([
        uploadFile(thumbnail, "image"),
      ]);

      data = {
        title,
        prompt,
        thumbnail: thumbnailUrl,
      };
    }

    if (video) {
      const [videoUrl] = await Promise.all([uploadFile(video, "video")]);

      data = {
        title,
        prompt,

        video: videoUrl,
      };
    }

    if (!thumbnail && !video) {
      data = {
        title,
        prompt,
      };
    }

    const newPost = await databases.updateDocument(
      config.databaseId,
      config.videosCollectionId,
      videoId,
      data
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};

export const deletePost = async (documentId) => {
  try {
    const videoDocument = await databases.deleteDocument(
      config.databaseId,
      config.videosCollectionId,
      documentId
    );

    return videoDocument;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
