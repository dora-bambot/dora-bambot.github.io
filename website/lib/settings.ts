const API_KEY = "api_key";
const BASE_URL = "base_url";
const MODEL = "model";

export function getApiKeyFromLocalStorage(): string {
    if (typeof window !== 'undefined') {

  return window.localStorage.getItem(API_KEY) || "";
    }
    return "";
}

export function setApiKeyToLocalStorage(key: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(API_KEY, key);
  }
}

export function getBaseURLFromLocalStorage(): string {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(BASE_URL) || "";
  }
  return ""; 
}

export function setBaseURLToLocalStorage(url: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(BASE_URL, url);
  }
}

function systemPromptKey(robotName?: string) {
  return robotName ? `system_prompt_${robotName}` : "system_prompt";
}

export function getSystemPromptFromLocalStorage(robotName?: string): string {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(systemPromptKey(robotName)) || "";
  } else {
    return "";
  }
}

export function setSystemPromptToLocalStorage(
  prompt: string,
  robotName?: string
) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(systemPromptKey(robotName), prompt);
  }
}

export function getModelFromLocalStorage(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(MODEL) || "";
  }
  return "";
}

export function setModelToLocalStorage(model: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(MODEL, model);
  }
}

// 后续可以添加更多设置项的 get/set 方法
