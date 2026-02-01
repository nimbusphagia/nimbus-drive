import { prisma } from "./prisma.js";
import bcrypt from 'bcrypt';

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
        name: "root"
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
export async function createFolder(userId, parentId, name) {
  const newFolder = await prisma.folder.create({
    data: {
      ownerId: userId,
      parentId: parentId,
      name: name,
    }
  });
  return newFolder;
}


