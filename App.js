import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Provider } from "react-redux";
import Main from "./Components/Main";
// import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";
export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_400Regular, Roboto_500Medium, Roboto_700Bold
  })
  if (!fontsLoaded) {
    return null;
  }
  return <Provider store={store}>
    <Main />
  </Provider>;
}


