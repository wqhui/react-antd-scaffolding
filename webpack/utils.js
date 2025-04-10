import fs from 'fs'
import path from 'path'
import * as PATHS from '../paths.js'

export const LIB_FILE_PREFIX = 'dll.'

export function getDLLFiles() {
  // 获取 DLL 目录下所有 JS 文件
  let dllFiles = []

  try {
    // 检查 DLL 目录是否存在
    if (fs.existsSync(PATHS.dllPath)) {
      dllFiles = fs
        .readdirSync(PATHS.dllPath)
        .filter(
          (file) => file.endsWith('.js') && file.startsWith(LIB_FILE_PREFIX),
        )
        .map((file) => path.resolve(PATHS.dllPath, file))
    }
  } catch (error) {
    console.warn('Error Locating the DLL file:', error)
  } finally {
    return dllFiles
  }
}

export function logEnableDllReferenceInfo() {
  console.log('👀 Located the DLL file, enable DLL Reference Plugin.')
}
