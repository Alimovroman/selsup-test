import React, { ChangeEvent, FC, useState } from "react";
import "./App.css";

interface Color {
  colorName: string;
}
interface Param {
  id: number;
  name: string;
  type: "string";
}
interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramsValue: ParamValue[];
  colors: Color[];
}
interface Props {
  params: Param[];
  model: Model;
}

const params: Param[] = [
  { id: 1, name: "Назначение", type: "string" },
  { id: 2, name: "Длина", type: "string" },
];
const model: Model = {
  paramsValue: [
    { paramId: 1, value: "Повседневное" },
    { paramId: 2, value: "Макси" },
  ],
  colors: [],
};

const Main: FC<Props> = ({ model, params }) => {
  const [state, setState] = useState({ model, params });

  const getModel = () => {
    return state.model.paramsValue;
  };

  const onChangeValue = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      model: {
        ...state.model,
        paramsValue: state.model.paramsValue.map((model) =>
          model.paramId === id
            ? { ...model, value: e.currentTarget.value }
            : model
        ),
      },
    });
  };

  return (
    <div className="App">
      <div>
        {state.params.map((param) => (
          <div key={param.id}>
            <div>{param.name}</div>{" "}
          </div>
        ))}
      </div>
      <div>
        {state.model.paramsValue.map((m) => (
          <div key={m.paramId}>
            <input
              value={m.value}
              onChange={(e) => onChangeValue(m.paramId, e)}
            />
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => console.log(getModel())}>get model</button>
      </div>
    </div>
  );
};

export const App = () => {
  return <Main model={model} params={params} />;
};
