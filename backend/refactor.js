const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const modulesDir = path.join(srcDir, 'modules');
const sharedDir = path.join(srcDir, 'shared');

// Ensure directories exist
const dirsToCreate = [
  modulesDir,
  path.join(modulesDir, 'booking'),
  path.join(modulesDir, 'court'),
  path.join(modulesDir, 'user'),
  path.join(modulesDir, 'admin'),
  path.join(modulesDir, 'owner'),
  path.join(modulesDir, 'auth'),
  sharedDir,
  path.join(sharedDir, 'middlewares'),
  path.join(sharedDir, 'utils'),
  path.join(sharedDir, 'config')
];

dirsToCreate.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Mapping of files to their new destinations
const fileMoves = [
  // Booking module
  ['controllers/booking.controller.ts', 'modules/booking/booking.controller.ts'],
  ['services/booking.service.ts', 'modules/booking/booking.service.ts'],
  ['repositories/booking.repository.ts', 'modules/booking/booking.repository.ts'],
  ['routers/booking.routes.ts', 'modules/booking/booking.routes.ts'],
  
  // Court module (includes field and location)
  ['controllers/field.controller.ts', 'modules/court/field.controller.ts'],
  ['services/field.service.ts', 'modules/court/field.service.ts'],
  ['repositories/court.repository.ts', 'modules/court/court.repository.ts'],
  ['repositories/location.repository.ts', 'modules/court/location.repository.ts'],
  ['routers/field.routes.ts', 'modules/court/field.routes.ts'],

  // User module
  ['controllers/user.controller.ts', 'modules/user/user.controller.ts'],
  ['services/user.service.ts', 'modules/user/user.service.ts'],
  ['repositories/user.repository.ts', 'modules/user/user.repository.ts'],
  ['routers/user.routes.ts', 'modules/user/user.routes.ts'],

  // Admin module
  ['controllers/admin.controller.ts', 'modules/admin/admin.controller.ts'],
  ['services/admin.service.ts', 'modules/admin/admin.service.ts'],
  ['routers/admin.routes.ts', 'modules/admin/admin.routes.ts'],

  // Owner module
  ['controllers/owner.controller.ts', 'modules/owner/owner.controller.ts'],
  ['services/owner.service.ts', 'modules/owner/owner.service.ts'],
  ['routers/owner.routes.ts', 'modules/owner/owner.routes.ts'],

  // Shared Middlewares
  ['middlewares/auth.middleware.ts', 'shared/middlewares/auth.middleware.ts'],
  ['middlewares/errorHandler.ts', 'shared/middlewares/errorHandler.ts'],
  ['middlewares/upload.middleware.ts', 'shared/middlewares/upload.middleware.ts'],

  // Shared Utils
  ['utils/ApiError.ts', 'shared/utils/ApiError.ts'],
  ['utils/jwt.ts', 'shared/utils/jwt.ts'],

  // Shared Configs
  ['config/cloudinary.config.ts', 'shared/config/cloudinary.config.ts'],
  ['config/prisma.ts', 'shared/config/prisma.ts']
];

// Helper to calculate relative paths between old and new directories
function fixImports(content, fileMovePath) {
  const isModulePath = fileMovePath.startsWith('modules/');
  
  if (isModulePath) {
    // If it's a module file, it went from `src/type/file.ts` to `src/modules/name/file.ts`
    // Depth increased by 1: from `../` to `../../`
    // Or if importing same module file, it becomes `./`
    
    // Replace types
    content = content.replace(/from\s+['"]\.\.\/types\/(.*?)['"]/g, 'from "../../types/$1"');
    
    // Replace middlewares, utils, config
    content = content.replace(/from\s+['"]\.\.\/middlewares\/(.*?)['"]/g, 'from "../../shared/middlewares/$1"');
    content = content.replace(/from\s+['"]\.\.\/utils\/(.*?)['"]/g, 'from "../../shared/utils/$1"');
    content = content.replace(/from\s+['"]\.\.\/config\/(.*?)['"]/g, 'from "../../shared/config/$1"');
    content = content.replace(/from\s+['"]\.\.\/\.\.\/config\/(.*?)['"]/g, 'from "../../shared/config/$1"');
    
    // Replace same module imports (e.g. controller -> service, service -> repository)
    content = content.replace(/from\s+['"]\.\.\/services\/(.*?)['"]/g, 'from "./$1"');
    content = content.replace(/from\s+['"]\.\.\/repositories\/(.*?)['"]/g, 'from "./$1"');
    content = content.replace(/from\s+['"]\.\.\/controllers\/(.*?)['"]/g, 'from "./$1"');
    content = content.replace(/from\s+['"]\.\.\/routers\/(.*?)['"]/g, 'from "./$1"');

    // Cross-module imports? (e.g. user.service from booking)
    // Actually, simple regex might fail if cross module. Let's hope there's minimal cross-module imports.
    // We can run `tsc` later to verify.
  } else if (fileMovePath.startsWith('shared/')) {
    // Moved from `src/middlewares/` to `src/shared/middlewares/`
    // Depth increased by 1
    content = content.replace(/from\s+['"]\.\.\/utils\/(.*?)['"]/g, 'from "../utils/$1"');
    content = content.replace(/from\s+['"]\.\.\/config\/(.*?)['"]/g, 'from "../config/$1"');
    content = content.replace(/from\s+['"]\.\.\/middlewares\/(.*?)['"]/g, 'from "../middlewares/$1"');
    content = content.replace(/from\s+['"]\.\.\/types\/(.*?)['"]/g, 'from "../../types/$1"');
    content = content.replace(/from\s+['"]\.\.\/\.\.\/types\/(.*?)['"]/g, 'from "../../types/$1"');
  }

  return content;
}

// Perform moves and updates
fileMoves.forEach(([oldPath, newPath]) => {
  const oldFullPath = path.join(srcDir, oldPath);
  const newFullPath = path.join(srcDir, newPath);
  if (fs.existsSync(oldFullPath)) {
    let content = fs.readFileSync(oldFullPath, 'utf-8');
    content = fixImports(content, newPath);
    fs.writeFileSync(newFullPath, content);
    fs.unlinkSync(oldFullPath);
    console.log(`Moved & Updated: ${oldPath} -> ${newPath}`);
  }
});

// Update app.ts and server.ts
const appTsPath = path.join(srcDir, 'app.ts');
if (fs.existsSync(appTsPath)) {
  let appContent = fs.readFileSync(appTsPath, 'utf-8');
  appContent = appContent.replace(/from\s+['"]\.\/routers\/user\.routes\.js['"]/g, 'from "./modules/user/user.routes.js"');
  appContent = appContent.replace(/from\s+['"]\.\/routers\/admin\.routes\.js['"]/g, 'from "./modules/admin/admin.routes.js"');
  appContent = appContent.replace(/from\s+['"]\.\/routers\/field\.routes\.js['"]/g, 'from "./modules/court/field.routes.js"');
  appContent = appContent.replace(/from\s+['"]\.\/routers\/owner\.routes\.js['"]/g, 'from "./modules/owner/owner.routes.js"');
  appContent = appContent.replace(/from\s+['"]\.\/routers\/booking\.routes\.js['"]/g, 'from "./modules/booking/booking.routes.js"');
  appContent = appContent.replace(/from\s+['"]\.\/middlewares\/errorHandler\.js['"]/g, 'from "./shared/middlewares/errorHandler.js"');
  
  // Add auth route
  if (!appContent.includes('authRoutes')) {
    appContent = appContent.replace(/import bookingRoutes from ['"].\/modules\/booking\/booking\.routes\.js['"];/, 'import bookingRoutes from "./modules/booking/booking.routes.js";\nimport authRoutes from "./modules/auth/auth.routes.js";');
    appContent = appContent.replace(/import bookingRoutes from ['"].\/routers\/booking\.routes\.js['"];/, 'import bookingRoutes from "./modules/booking/booking.routes.js";\nimport authRoutes from "./modules/auth/auth.routes.js";');
    appContent = appContent.replace(/app\.use\(['"]\/booking['"],\s*bookingRoutes\);/, 'app.use("/booking", bookingRoutes);\napp.use("/auth", authRoutes);');
  }
  
  fs.writeFileSync(appTsPath, appContent);
  console.log('Updated app.ts imports');
}

const serverTsPath = path.join(srcDir, 'server.ts');
if (fs.existsSync(serverTsPath)) {
  let serverContent = fs.readFileSync(serverTsPath, 'utf-8');
  serverContent = serverContent.replace(/from\s+['"]\.\/config\/prisma\.js['"]/g, 'from "./shared/config/prisma.js"');
  fs.writeFileSync(serverTsPath, serverContent);
  console.log('Updated server.ts imports');
}

// Clean up old directories if empty
const dirsToClean = ['controllers', 'services', 'repositories', 'routers', 'middlewares', 'utils', 'config'];
dirsToClean.forEach(dir => {
  const fullPath = path.join(srcDir, dir);
  if (fs.existsSync(fullPath)) {
    try {
      const files = fs.readdirSync(fullPath);
      if (files.length === 0) {
        fs.rmdirSync(fullPath);
        console.log(`Removed empty directory: ${dir}`);
      } else {
        console.log(`Directory ${dir} not empty, skipping removal.`);
      }
    } catch (e) {}
  }
});
