import {cast, flow, getParent, onSnapshot, types} from 'mobx-state-tree'
import {uuid} from 'uuidv4';
import {User} from "@/common/store/users";
import api from "@/api";


const BoardTask = types.model('BoardTask', {
    id: types.identifier,
    title: types.string,
    description: types.maybe(types.string),
    assignee: types.safeReference(User),
});

const BoardSection = types.model('BoardSection', {
    id: types.identifier,
    title: types.string,
    tasks: types.array(BoardTask)
}).actions(self => ({
    load: flow(function* () {
        const {id: board_id} = getParent(self, 2);
        const {id: status_id} = self;
        const {tasks} = yield api.get(`boards/${board_id}/tasks/${status_id}`);

        self.tasks = cast(tasks);

        onSnapshot(self, self.save);
    }),
    afterCreate() {
        self.load();
    },
    save: flow(function* ({tasks}) {
        const {id: board_id} = getParent(self, 2);
        const {id: tasks_id} = self;

        yield api.put(`boards/${board_id}/tasks/${tasks_id}`, {tasks});
    }),
    addTask(payload: any) {
        self.tasks.push(payload);
    }
}));


const Board = types.model('Board', {
    id: types.identifier,
    title: types.string,
    sections: types.array(BoardSection),
}).actions(self => ({
    addTask(section_id: string, payload: any) {
        const section = self.sections.find(section => section.id === section_id)

        section?.tasks.push({
            id: uuid(),
            ...payload
        })
    },
    moveTask(task_id: string, source: { droppable_id: string }, destination: { index: string, droppable_id: string }) {
        const from_section = self.sections.find(section => section.id === source.droppable_id);
        const to_section = self.sections.find(section => section.id === destination.droppable_id);
        const task_to_move_index = from_section?.tasks.findIndex(task => task.id === task_id);
        const [task] = from_section?.tasks.splice(task_to_move_index, 1);

        to_section.tasks.splice(destination?.index, 0, task.toJSON());
    },
}))


const BoardStore = types.model('BoardStore', {
    list: types.array(Board),
    active: types.safeReference(Board),
}).actions(self => {
    return {
        load: flow(function* () {
            self.list = yield api.get('boards');
            self.active = 'MAIN';
        }),
        afterCreate() {
            self.load();
        },
    }
})

export default BoardStore