import { cardsMockHandlers } from "./cards/cards-mockHandlers";
import { userMockHandlers } from "./user/user-mockHandlers";

export const handlers = [...userMockHandlers, ...cardsMockHandlers];
