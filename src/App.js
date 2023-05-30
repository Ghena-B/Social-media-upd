import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header";
import Menu from "./components/Menu/Menu";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";


const App = () => {

    return (
        <BrowserRouter>
            <div className="App">
                <HeaderContainer/>
                <Menu />
                <div className='main'>
                    <Routes>
                        <Route path="/profile/:userId?" element={<ProfileContainer />}/>
                        <Route path="/dialogs/*" element={<DialogsContainer />}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/users" element={<UsersContainer/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
};

export default App;