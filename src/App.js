import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Routes, Route} from "react-router-dom";


const App = (props) => {

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Menu state={props.state.sidebar}/>
                <div className='main'>
                    <Routes>
                        <Route path="/profile" element={<Profile profilePage={props.state.profilePage} dispatch={props.dispatch}/>}/>
                        <Route path="/dialogs/*" element={<Dialogs state={props.state.dialogsPage} dispatch={props.dispatch}/>}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
};

export default App;