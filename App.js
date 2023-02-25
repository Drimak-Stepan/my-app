import { useEffect } from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import { store } from "./redux/store";
import Main from "./components/Main";

const App = () => {
  const [loadedFonts] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!loadedFonts) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
