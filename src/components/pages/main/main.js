import List from "../../list/list";
import Form from "../../form/form";

import { useNavigate } from "react-router-dom";

import './main.scss';

function Main({inputData, setInputData, isLoggedIn, loggedIn}) {
    const navigate = useNavigate();

    function logout() {
        loggedIn(false);
        localStorage.removeItem('jwt');
        navigate('/authorization', {replace: true});
    }

    return (
        <>
            <main>
                <section className="main">
                    <div className="container">
                        <button className="main__btn" onClick={ logout }>Выйти</button>
                        <Form isLoggedIn={ isLoggedIn } inputData={ inputData } setInputData={ setInputData }/>
                        <List inputData={ inputData } setInputData={ setInputData }/>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Main;