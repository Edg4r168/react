import type { TodoId, Todo as TodoType } from "../types";

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void;
  onToggleCompleted: ({
    id,
    completed,
  }: Pick<TodoType, "id" | "completed">) => void;
}

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  onRemoveTodo,
  onToggleCompleted,
}) => {
  const handleChangeCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    onToggleCompleted({ id, completed: e.target.checked });
  };

  return (
    <div className="view">
      <input
        className=""
        type="checkbox"
        checked={completed}
        onChange={handleChangeCheckbox}
      />

      {title}

      <button className="destroy" onClick={() => onRemoveTodo({ id })}></button>
    </div>
  );
};
