import supabase from '@/services/supabse.js'
import { useTelegram } from '@/services/telegram.js'
import {useScoreStore} from "@/stores/score.js";

const { user } = useTelegram()

const MY_ID = user?.id ?? 4252

export async function fetchTasks() {
    const { data } = await supabase
        .from('tasks')
        .select('*')
    return data
}

export async function getOrCreateUser() {
    const potentialUser = await supabase
        .from('users')
        .select()
        .eq('telegram', MY_ID)

    if (potentialUser.data.length !== 0) {
        return potentialUser.data[0]
    }

    const newUser = {
        telegram: MY_ID,
        friends: {},
        tasks: {},
        score: 0,
    }

    await supabase
        .from('users')
        .insert(newUser)

    return newUser
}

export async function updateScore(score) {
    await supabase
        .from('users')
        .update({ score })
        .eq('telegram', MY_ID)
}

export async function registerRef(userName, refId) {
    const { data } = await supabase
        .from('users')
        .select()
        .eq('telegram', +refId)
    const refUser = data[0]

    await supabase
        .from('users')
        .update({
        friends: { ...refUser.friends, [MY_ID]: userName },
        score: refUser.score + 50
    })
        .eq('telegram', +refId)
}

export async function completeTask(user, task) {
    const score = useScoreStore()
    const newScore = score.score + task.amount
    score.setScore(newScore)

    await supabase
        .from('users')
        .update({
        tasks: { ...user.tasks, [task.id]: true},
        score: newScore,
    })
        .eq('telegram', MY_ID)

}