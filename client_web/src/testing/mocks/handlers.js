import { cardsMockHandlers } from "./cards/cards.mock.handlers";
import { userMockHandlers } from "./user/user.mock.handlers";

export const handlers = [...userMockHandlers, ...cardsMockHandlers];
