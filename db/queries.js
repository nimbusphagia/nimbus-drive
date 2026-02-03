import { prisma } from "./prisma.js";
import bcrypt from 'bcrypt';
import { nanoid } from "nanoid";

// General
export async function initializeUser(username, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        username,
        password_hash: passwordHash,
      }
    });

    await tx.folder.create({
      data: {
        ownerId: user.id,
        name: "My drive"
      }
    });

    return user;
  });
}

export async function getAllFiles(userId) {
  const folders = await prisma.folder.findMany({
    where: { ownerId: userId },
    select: {
      id: true,
      name: true,
      parentId: true
    },
    orderBy: { name: "asc" }
  });
  return folders;
}

export async function createPublicUrl(type) {
  if (type !== 'FILE' && type !== 'FOLDER') throw new Error('Error creating public url');
  const publicUrl = await prisma.publicUrl.create({
    data: {
      hash: nanoid(16),
      type: type
    }
  });
  return publicUrl;
}

// Users
export async function getUserByUsername(username) {
  return await prisma.user.findUnique({
    where: { username },
  });
}

export async function getUserById(id) {
  return await prisma.user.findUnique({
    where: { id },
  })
}

// Folders
export async function createFolder(userId, parentId, name, publicUrlId) {
  const newFolder = await prisma.folder.create({
    data: {
      ownerId: userId,
      parentId: parentId,
      name: name,
      publicUrlId: publicUrlId,
    }
  });
  return newFolder;
}

export async function getFolderById(folderId, userId) {
  const folder = await prisma.folder.findFirstOrThrow({
    where: { ownerId: userId, id: folderId },
    select: {
      name: true,
      id: true,
      folders: {
        select: {
          name: true,
          id: true,
          publicUrl: { select: { hash: true } }
        }
      },
      files: {
        select: {
          name: true,
          id: true,
          publicUrl: { select: { hash: true } }
        }
      },
      publicUrl: { select: { hash: true } },
    },
  });
  return folder;
}

export async function getRootFolder(userId) {
  const folder = await prisma.folder.findFirstOrThrow({
    where: { ownerId: userId, parentId: null },
    select: {
      name: true,
      id: true,
      folders: {
        select: {
          name: true,
          id: true,
          publicUrl: { select: { hash: true } }
        }
      },
      files: {
        select: {
          name: true,
          id: true,
          publicUrl: { select: { hash: true } }
        }
      },
      publicUrl: {
        select: { hash: true }
      },
    }
  });
  return folder;
}

export async function updateFolder(folderId, userId, name) {
  const updatedFolder = await prisma.folder.update({
    where: { id: folderId, ownerId: userId },
    data: { name: name },
  });
  return updatedFolder;
}

export async function deleteFolder(folderId, userId) {
  await prisma.folder.delete({
    where: { id: folderId, ownerId: userId },
  })
}

// Files
export async function getFileById(fileId, userId) {
  const file = await prisma.file.findUnique({
    where: {
      id: fileId,
      ownerId: userId,
    },
    select: {
      id: true,
      owner: {
        select: {
          username: true,
          id: true,
        }
      },
      name: true,
      publicUrl: {
        select: {
          hash: true,
        },
      },
      createdAt: true,
      folder: true,
    }
  });
  return file;
}
export async function getFileByFolder(folderId, userId) {
  const file = await prisma.file.findFirstOrThrow({
    where: { ownerId: userId, folderId: folderId },
  });
  return file;
}

export async function createFile(folderId, userId, name, url = 'emptyUrl', publicUrlId) {
  return await prisma.file.create({
    data: {
      folderId,
      ownerId: userId,
      name,
      url,
      publicUrlId,
    },
  });
}

// Public Link

export async function getFileByPublic(publicHash) {
  const publicUrl = await prisma.publicUrl.findUniqueOrThrow({ where: { hash: publicHash } });
  if (publicUrl.type === 'FILE') {
    return await prisma.file.findUniqueOrThrow({ where: { publicUrlId: publicUrl.id } });
  }
  throw new Error('Invalid url');
}
export async function getFolderByPublic(publicHash) {
  const publicUrl = await prisma.publicUrl.findUniqueOrThrow({ where: { hash: publicHash } });
  if (publicUrl.type === 'FOLDER') {
    return await prisma.folder.findUniqueOrThrow({
      where: { publicUrlId: publicUrl.id },
      select: {
        name: true,
        id: true,
        folders: {
          select: {
            name: true,
            id: true,
            publicUrl: {
              select: { hash: true },
            },
          },
        },
        files: {
          select: {
            name: true,
            id: true,
            publicUrl: {
              select: { hash: true },
            },
          },
        },
        publicUrl: true,
      }
    });
  }
  throw new Error('Invalid url');
}
