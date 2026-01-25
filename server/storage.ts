import { db } from "./db";
import {
  projects, accounts, dailyTasks, logs, settings,
  type Project, type InsertProject,
  type Account, type InsertAccount,
  type DailyTask, type InsertDailyTask,
  type Log, type InsertLog,
  type Settings, type InsertSettings
} from "@shared/schema";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  deleteProject(id: number): Promise<void>;

  // Accounts
  getAccounts(): Promise<Account[]>;
  updateAccountNotes(id: number, notes: string): Promise<Account>;
  createAccount(account: InsertAccount): Promise<Account>;

  // Daily Tasks
  getDailyTasks(): Promise<DailyTask[]>;
  createDailyTask(task: InsertDailyTask): Promise<DailyTask>;
  toggleDailyTask(id: number, isCompleted: boolean): Promise<DailyTask>;
  deleteDailyTask(id: number): Promise<void>;

  // Logs
  getLogs(): Promise<Log[]>;
  createLog(log: InsertLog): Promise<Log>;

  // Stats
  getStats(): Promise<{
    totalAccounts: number;
    liveAccounts: number;
    blockedAccounts: number;
    livePercent: number;
  }>;

  // Settings
  getSettings(): Promise<Settings>;
  updateSettings(settings: InsertSettings): Promise<Settings>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  async getAccounts(): Promise<Account[]> {
    return await db.select().from(accounts);
  }

  async createAccount(account: InsertAccount): Promise<Account> {
    const [newAccount] = await db.insert(accounts).values(account).returning();
    return newAccount;
  }

  async updateAccountNotes(id: number, notes: string): Promise<Account> {
    const [updated] = await db.update(accounts)
      .set({ notes })
      .where(eq(accounts.id, id))
      .returning();
    return updated;
  }

  async getDailyTasks(): Promise<DailyTask[]> {
    return await db.select().from(dailyTasks).orderBy(dailyTasks.id);
  }

  async createDailyTask(task: InsertDailyTask): Promise<DailyTask> {
    const [newTask] = await db.insert(dailyTasks).values(task).returning();
    return newTask;
  }

  async toggleDailyTask(id: number, isCompleted: boolean): Promise<DailyTask> {
    const [updated] = await db.update(dailyTasks)
      .set({ isCompleted })
      .where(eq(dailyTasks.id, id))
      .returning();
    return updated;
  }

  async deleteDailyTask(id: number): Promise<void> {
    await db.delete(dailyTasks).where(eq(dailyTasks.id, id));
  }

  async getLogs(): Promise<Log[]> {
    return await db.select().from(logs).orderBy(desc(logs.timestamp)).limit(50);
  }

  async createLog(log: InsertLog): Promise<Log> {
    const [newLog] = await db.insert(logs).values(log).returning();
    return newLog;
  }

  async getStats() {
    const allAccounts = await db.select().from(accounts);
    const totalAccounts = allAccounts.length;
    const liveAccounts = allAccounts.filter(a => a.status === 'live').length;
    const blockedAccounts = allAccounts.filter(a => a.status === 'blocked').length;
    
    const livePercent = totalAccounts > 0 
      ? Math.round((liveAccounts / totalAccounts) * 100) 
      : 0;

    return {
      totalAccounts,
      liveAccounts,
      blockedAccounts,
      livePercent
    };
  }

  async getSettings(): Promise<Settings> {
    const [s] = await db.select().from(settings).limit(1);
    if (!s) {
      const [newSettings] = await db.insert(settings).values({ 
        telegramThreads: 1, 
        telegramFolderPath: "",
        chromeThreads: 1,
        chromeFolderPath: ""
      }).returning();
      return newSettings;
    }
    return s;
  }

  async updateSettings(input: InsertSettings): Promise<Settings> {
    const s = await this.getSettings();
    const [updated] = await db.update(settings)
      .set(input)
      .where(eq(settings.id, s.id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
