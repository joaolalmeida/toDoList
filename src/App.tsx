import rocket from "./assets/rocket.png"
import styles from "./App.module.css"
import "./styles/global.css"

import { AiOutlinePlusCircle } from "react-icons/ai"
import { BsTrash3 } from "react-icons/bs"
import { TbClipboardText } from "react-icons/tb"

import { useState } from "react"

type Task = {
  name: string
  completed: boolean
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  function addTask(taskName: string) {
    setTasks([...tasks, { name: taskName, completed: false }])
  }

  function toggleComplete(index: number) {
    const newTasks = [...tasks]
    newTasks[index].completed = !newTasks[index].completed
    setTasks(newTasks)
  }

  function removeTask(index: number) {
    const newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
  }

  function countTasks(): number {
    return tasks.length
  }

  function countCompletedTasks(): number {
    return tasks.filter((task) => task.completed).length
  }

  const completedTasks: number = countCompletedTasks()
  const totalTasks: number = countTasks()
  const completedTasksText: string =
    totalTasks === 0 ? "0" : `${completedTasks} de ${totalTasks}`

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <img src={rocket} alt="" />
        <h1>
          to<span>do</span>
        </h1>
      </header>
      <main className={styles.main}>
        <div className={styles.teste}>
          <form
            className={styles.newTask}
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.target as HTMLFormElement
              const taskNameElement = form.elements.namedItem("taskName")
              const taskName =
                taskNameElement instanceof HTMLInputElement
                  ? taskNameElement.value
                  : undefined
              if (taskName !== undefined) {
                addTask(taskName)
                form.reset()
              }
            }}
          >
            <input
              name="taskName"
              className={styles.inputTaskName}
              type="text"
              placeholder="Adicione uma nova tarefa"
            />
            <button type="submit">
              Criar
              <span>
                <AiOutlinePlusCircle size={17} />
              </span>
            </button>
          </form>
          <div className={styles.count}>
            <div className={styles.countTasks}>
              <p>Tarefas criadas</p>
              <span>{countTasks()}</span>
            </div>
            <div className={styles.countCompletedTasks}>
              <p>Concuidas</p>
              <span>{completedTasksText}</span>
            </div>
          </div>
          {tasks.length === 0 ? (
            <div className={styles.tasksNone}>
              <TbClipboardText size={70} />
              <p>Você ainda não tem tarefas cadastradas.</p>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          ) : (
            <ul className={styles.tasks}>
              {tasks.map((task: Task, index: number) => (
                <li key={index}>
                  <label className={styles.lixeira}>
                    <div>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={task.completed}
                        onChange={() => toggleComplete(index)}
                      />
                      <span
                        style={{
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {task.name}
                      </span>
                    </div>
                    <div onClick={() => removeTask(index)}>
                      <BsTrash3 size={17} className={styles.trash} />
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}
