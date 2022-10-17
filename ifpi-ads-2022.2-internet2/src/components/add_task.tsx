import { ChangeEvent, FormEvent, useState } from "react"
import { FormGroup, Input } from "./forms"

interface AddTaskProps{
    onAddTask: (text: string) => void
}

export function AddTask({onAddTask}: AddTaskProps){

    const [taskText, setTaskText] = useState('')

    const handlerDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskText(event.target.value)
    }

    const handlerSubmit = (event: FormEvent) => {
        event.preventDefault()
        onAddTask(taskText)
        setTaskText('')
    }

    return (
        <FormGroup>
            <form onSubmit={handlerSubmit}>
                <Input 
                    type="text" 
                    value={taskText} 
                    onChange={handlerDescriptionChange}  
                    placeholder="Descrição" />
                <Input type="submit" value="Adicionar Tarefa" />
            </form>
        </FormGroup>
    )
}