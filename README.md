# Nexa Developer README

Welcome to Nexa Docs!
This readme contains crucial information for getting started with the Nexa codebase.

## First-time contributors note

Please read the entire readme for a smooth onboarding experience. It covers everything you need to know to start contributing effectively.

## Project Mission

Nexa aims to foster connections between minority-owned businesses and their communities through an iOS app.

## Cloning the Monorepo

If you are already familiar with cloning using the command line and have the correct URL, you can skip this section.

1. Open your Terminal (search for "Terminal" or "Command Prompt" depending on your operating system).
2. Navigate to the directory where you want to clone the repository. Use the command `cd path/to/directory` (replace path/to/directory with the actual path).
3. Run the cloning command: Paste the following command and press Enter:

   ```bash
   git clone https://github.com/AWS-Team-Minority-2/minority-two.git
   ```

## Database Configuration (Important)

**Please Note: To ensure a smooth development process and prevent potential errors, please complete the database configuration before proceeding further. This is a one-time setup that lays a solid foundation for your project.
**

### Requirements:

Ensure that you have Postgres and pgAdmin installed on your local machine.

### Configuration

Nexa's local development relies on a local Postgres Database named `nexa` with the connection port set to `5000`. This configuration only needs to be done once.

1. Open Postgres and click on `Preferences`.
2. In the pop-up, click the + icon, then name your server (this is not the same as the database). Most users name the server as "PostgreSQL 15".
3. Once downloaded, open pgAdmin 4 and register your Postgres Server with the following details:

   - Port: 5000
   - Maintenance database: postgres
   - Username: postgres
   - Hostname: localhost (leave blank if it's blank)
     **If successful, you should now see the 'databases' tab in the left sidebar. **

4. Right-click on the 'databases' tab and select 'Create' then 'Database'.
5. Name the database 'nexa' in the provided field.

## Dependencies and Packages

Nexa relies on the power of `pnpm` to manage dependencies and packages.

### Installing Dependencies

To install all dependencies, run `pnpm install` from the root directory (`minority-two`).

### Local Dependencies vs. Global Dependencies

Our codebase is a monorepo with different apps, each having its own set of dependencies. Some dependencies are required universally, while others are specific to certain apps. When installing dependencies, it is preferred to install them locally. Refer to the sections below for details.

#### Local Dependencies Installation

To install a new dependency, navigate to the app or package and use the `pnpm install ...` command.

Example: Mariah needs to install a new dependency called 'pkg-b' inside the frontend. She follows these steps:

1. `cd apps/frontend`
2. Run `pnpm i pkg-b`
3. `cd ../..` (to return to the root)

#### Global Dependencies Installation

To install a global dependency, stay inside the root and use the `pnpm install ...` command along with the `--workspace-root` flag.

Example: Doron wants to install TypeScript for the entire monorepo. He follows these steps:

- `pnpm install typescript --workspace-root`

(Note: Without the `--workspace-root` flag, the dependency will not be installed at the root level.)

# Starting Development

- To begin development, simply run the command pnpm dev.

This command will migrate the database (refer to the README in apps/migration for more information) and initiate the Xcode simulator.
