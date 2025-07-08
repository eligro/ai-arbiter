# Task 3: Core Conflict Flow

**Status: In Progress**

- **Frontend:**
  - [x] Create the "New Conflict" wizard (multi-step form).
    - [x] Step 1: Title, description.
    - [x] Step 2: Invite party by email.
    - [x] Step 3: Review and submit.
  - [ ] Build the main "Conflict Room" UI.
    - [ ] Use a tabbed interface: My Arguments, Q&A, Status.
    - [ ] Implement CRUD functionality for `inputs` (arguments).
    - [ ] Display questions from the arbiter.
    - [ ] Show the current status of the conflict.
- **Backend (Database & API):**
  - [x] Implement `create_conflict_and_invite` RPC to create a new conflict and its members.
  - [x] Update `GET /conflicts` RLS to fetch conflicts for the current user.
  - [ ] Implement `GET /conflicts/:id` to fetch data for the conflict room (respecting RLS).
  - [ ] Implement `POST /inputs` and `PATCH /inputs/:id`.
