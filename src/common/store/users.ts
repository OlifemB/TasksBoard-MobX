import {flow, types} from 'mobx-state-tree';
import api from '@/api'



export const User = types.model('User', {
    id: types.identifier,
    created_at: types.string,
    name: types.string,
    avatar: types.string,
});

export const UserMe = User.named('UserMe')

const UsersStore = types.model('UsersStore', {
    list: types.maybe(types.array(User)),
    me: types.maybe(UserMe)
}).actions(self => ({
    load: flow(function* () {
        self.list = yield api.get('users');
        self.me = yield api.get('me');
    }),
    afterCreate() {
        self.load();
    },

    setMe(data: any) {
        self.me = data
    },

    setUsers(data: any) {
        self.list = data.toJSON()
    },
}))

export default UsersStore