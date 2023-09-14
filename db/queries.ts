import { prisma } from "../db/db";
import { Account } from "../models/account";

export const createUser = async (account: Account) => {
  account = await prisma.user.create({
    data: {
      name: account.name,
      balance: account.balance,
      id: account.id,
    },
  });
  console.log("Account created".green);
  return account;
};

export const $listAccounts = async () => {
  const account = await prisma.user.findMany();
  return account;
};

export const $deposit = async (amount: number, id: string) => {
  try {
    const account = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!account) {
      throw new Error("Account not found");
    }
    account.balance += amount;
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        balance: account.balance,
      },
    });
  } catch (error) {
    return error;
  }
};

export const $withdraw = async (amount: number, id: string) => {
  try {
    const account = await prisma.user.findMany({
      where: {
        id: id,
      },
    });
    if (!account) {
      throw new Error("Account not found");
    }

    if (account[0].balance < amount) {
      throw new Error("Insufficient funds");
    }

    await prisma.user.update({
      where: { id },
      data: {
        balance: (account[0].balance -= amount),
      },
    });

    console.log("Withdraw completed".green);
  } catch (error) {
    return error;
  }
};

export const $checkBalance = async (id: string) => {
  const account = await prisma.user.findMany({
    where: { id },
  });
  console.log("\n");
  console.log("Your balance is: ".green, account[0].balance);
};

export const $transfer = async (
  amount: number,
  userId: string,
  recipientId: string
) => {
  try {
    const accounts = await prisma.user.findMany({
      where: {
        id: { in: [userId, recipientId] },
      },
    });
    if (!accounts) {
      throw new Error("Account not found");
    }

    if (accounts[0].balance < amount) {
      throw new Error("Insufficient funds");
    }

    const check = await prisma.transaction.create({
      data: {
        senderId: userId,
        name: accounts[0].name,
        sender: accounts[1].name,
        amount,
      },
    });

    if (!check) {
      throw new Error("Error in transaction");
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        balance: (accounts[0].balance -= amount),
      },
    });

    await prisma.user.update({
      where: { id: recipientId },
      data: {
        balance: (accounts[1].balance += amount),
      },
    });
    console.log("Transfer completed".green);
  } catch (error) {
    return error;
  }
};

export const $checkTransactions = async (id: string) => {
  const transactions = await prisma.transaction.findMany({
    where: {
      senderId: id,
    },
  });
  return transactions;
};

export const $loadData = async () => {
  const data = await prisma.user.findMany({
    select: {
      name: true,
      balance: true,
      id: true,
    },
  });
  return data;
};
