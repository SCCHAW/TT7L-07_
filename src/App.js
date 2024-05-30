import React, { useState } from "react";
import { RootNavigation } from "./navigation/root-stacks";
import { Provider } from "react-redux";
import { store } from "./app/store";


const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
};


export default App;