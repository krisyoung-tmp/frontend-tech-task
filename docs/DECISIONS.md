# Decisions

-   Persistence will be provided via a REST api, however, full DB persistence is beyond the scope of the task; instead data is cached in-memory and seeded on server start.

-   State management will be handled via React context and the useReducer hook at a domain level using a light-weight redux style pattern.
    -- auth
    -- tasks
    -- users

-   task list should be searchable (title and description), filterable (status, ownership) and sortable (created date, due date)

-   task list has been virtualized on the client for render performance reasons; this should be sustainable for task quantities in the '000s, if the expectation is that tasks will run into 10s of '000s then a remote infinite scroll solution would be required. Standard pagination is not suitable for transient items like tasks as there is no predictable order.
