# Christmas Redemption System

🎄 Welcome to the Christmas Redemption System! Spread the holiday joy by efficiently managing the distribution of gifts to the teams in your department. This Node.js and Typescript-based system ensures a smooth process for representatives to redeem their team's gifts.

## Table of Contents

-   [Background](#background)
-   [Task](#task)
-   [Getting Started](#getting-started)
-   [Screenshots](#screenshots)

## Background

'Tis the season of giving, and you have the important task of distributing gifts to department teams. Each team can send a representative to redeem their gifts at the counter. The representative must show their staff pass as proof of identity, and each staff pass has a unique ID. A CSV file contains the mapping of staff pass IDs to their corresponding team names, along with the timestamp of when the mapping record was added.

## Task

Build a system that supports three main functions:

1. **Look up:** Perform a lookup of the representative's staff pass ID against the mapping file.
2. **Verify:** Verify if the team can redeem their gift by comparing the team name against past redemptions in the redemption data.
3. **Add Redemption:** Add new redemption to the redemption data if the team is still eligible; otherwise, send the representative away.

The redemption data should include at least the following information: `team_name` and `redeemed_at`, where the latter refers to the timestamp the redemption occurred in epoch milliseconds.

### Prerequisites

-   [ ] Ensure you have MSSQL Server installed on your machine.
-   [ ] [Download and install SQL Server Management Studio (SSMS)](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15).

### Database Configuration

1.  **Create a Database:**

    -   Open SSMS and connect to your SQL Server instance.
    -   Execute the following SQL query to create a new database:
        ```sql
        CREATE DATABASE GOVSUPPLY_GOVWALLET_THA;
        ```

2.  **Create Tables:**

    -   Execute the following SQL query to create necessary tables:

        ```sql
        CREATE TABLE STAFF_TEAM_MAPPING (
        staff_pass_id VARCHAR(64) PRIMARY KEY,
        team_name VARCHAR(64),
        created_at DATETIME,
        );

        CREATE TABLE REDEMPTION_RECORD (
        team_name VARCHAR(64) PRIMARY KEY,
        redeemed_at DATETIME,
        );
        ```

3.  **Insert staff into STAFF_TEAM_MAPPING** - Insert staff into table with the following example:

    ```sql
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('BOSS_6FDFMJGFV6YM', 'GRYFFINDOR', DATEADD(SECOND, 1620761965320 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('MANAGER_P49NK2CS3B5G', 'GRYFFINDOR', DATEADD(SECOND, 1614784710249 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('MANAGER_SEK8LLK8R8JL', 'HUFFLEPUFF', DATEADD(SECOND, 1618869819036 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('BOSS_4QXV76PK8MM0', 'HUFFLEPUFF', DATEADD(SECOND, 1619170338283 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('BOSS_ZMKJUMC03BJP', 'GRYFFINDOR', DATEADD(SECOND, 1636944833079 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('MANAGER_9JG4WVXWYR8U', 'RAVENCLAW', DATEADD(SECOND, 1620951126681 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('STAFF_P4NRHG1ERSP6', 'RAVENCLAW', DATEADD(SECOND, 1626838523289 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('BOSS_DNLHLUFFJ7E9', 'HUFFLEPUFF', DATEADD(SECOND, 1638024242211 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('BOSS_LRDTIELIM6RQ', 'HUFFLEPUFF', DATEADD(SECOND, 1619844503410 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('BOSS_CEQOWI8GNAB3', 'SLYTHERIN', DATEADD(SECOND, 1638117845204 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('MANAGER_3CX76CYYTIYK', 'GRYFFINDOR', DATEADD(SECOND, 1622440026883 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('BOSS_QFGSECPB8V8M', 'GRYFFINDOR', DATEADD(SECOND, 1631747670268 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('MANAGER_XJ82E6DN4BMQ', 'HUFFLEPUFF', DATEADD(SECOND, 1628451283246 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('MANAGER_K8P5WH99FQVN', 'RAVENCLAW', DATEADD(SECOND, 1611504398220 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('STAFF_AZ5HS58J5NA6', 'SLYTHERIN', DATEADD(SECOND, 1610793973888 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('MANAGER_T0KB593QNAJR', 'RAVENCLAW', DATEADD(SECOND, 1617810395946 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('MANAGER_6HCTTY0UQTZI', 'GRYFFINDOR', DATEADD(SECOND, 1622601477863 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('STAFF_C6ZD0WJPSG3C', 'HUFFLEPUFF', DATEADD(SECOND, 1623817186940 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('STAFF_LPJPQ0NMXTPY', 'HUFFLEPUFF', DATEADD(SECOND, 1619273585626 / 1000, '19700101 00:00:00:000'));
    INSERT INTO dbo.STAFF_TEAM_MAPPING VALUES('BOSS_PX7OV0I3QCVI', 'GRYFFINDOR', DATEADD(SECOND, 1610127167784 / 1000, '19700101 00:00:00:000'));
    ```

4.  **Configure Connection String:**

    -   Locate the `.env` file in the project.
    -   Update the following section with your MSSQL connection details:

    ```
    DB_USER = SA
    DB_PASSWORD = Password123
    DB_SERVER = localhost
    DB_PORT = 1433,
    DB_DATABASE_NAME = GOVSUPPLY_GOVWALLET_THA
    ```

## Getting Started

Follow these steps to set up and run the Christmas Redemption System:

1. **Clone the Repository:**

```bash
git clone https://github.com/ScorpiusSigma/GovSupply-GovWallet-THA.git
cd christmas-redemption-system
```

2. **Install Dependencies:**

```bash
npm install
```

3.  **Run the Application:**

```bash
npm run dev
```

4. **Run Cypress test:**

```bash
npm run component:headless
```

## Screenshots

### Home Screen

![Home Screen](./docs/HomeScreen.png)

### Search Screen

![Search Screen](./docs/SearchScreen.png)

### Redeeming Screen

![Redeeming Screen](./docs/RedeemingScreen.png)

### Redeemed Screen

![Redeemed Screen](./docs/RedeemedScreen.png)

Feel the festive spirit as you manage the Christmas Redemption System with ease. Happy holidays! 🎅🎁

[A Take-Home Assignment by GovTech GovSupply GovWallet](./docs/Take-Home%20Assignment%2059666bf04ff7483ba95edeb4a75f0b1c.pdf)
