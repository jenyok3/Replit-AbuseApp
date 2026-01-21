import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  link: text("link"),
  type: text("type").default("telegram"), // telegram or chrome
  createdAt: timestamp("created_at").defaultNow(),
});

export const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  name: text("name").notNull(),
  status: text("status").default("live"), // live, blocked
  lastActive: timestamp("last_active").defaultNow(),
});

export const dailyTasks = pgTable("daily_tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  isCompleted: boolean("is_completed").default(false),
});

export const logs = pgTable("logs", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true, createdAt: true });
export const insertAccountSchema = createInsertSchema(accounts).omit({ id: true, lastActive: true });
export const insertDailyTaskSchema = createInsertSchema(dailyTasks).omit({ id: true });
export const insertLogSchema = createInsertSchema(logs).omit({ id: true, timestamp: true });

export type Project = typeof projects.$inferSelect;
export type Account = typeof accounts.$inferSelect;
export type DailyTask = typeof dailyTasks.$inferSelect;
export type Log = typeof logs.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type InsertDailyTask = z.infer<typeof insertDailyTaskSchema>;
export type InsertLog = z.infer<typeof insertLogSchema>;
