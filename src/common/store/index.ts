import {Instance, types} from 'mobx-state-tree';
import BoardStore from "@/common/store/board";
import UsersStore from "@/common/store/users";

const RootStore = types.model('RootStore', {
    users: types.optional(UsersStore, {}),
    boards: types.optional(BoardStore, {}),
});

export type RootStoreModel = Instance<typeof RootStore>
export default RootStore;