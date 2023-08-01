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
    users: types.maybe(types.array(User)),
    me: types.maybe(UserMe)
}).actions(self => ({
    load: flow(function* () {
        yield api.get('users')
            .then(res => self.setUsers(res))
            .catch(err => console.log(err))

        yield api.get('me')
            .then(res => self.setMe(res))
            .catch(err => console.log(err))
    }),

    setMe(data: any) {
        console.log(data)
        self.me = data
    },

    setUsers(data: any) {
        console.log(data)
        self.users = data
    },

    afterCreate() {
        self.load()
    }
}))

export default UsersStore