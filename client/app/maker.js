const handleDomo = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'}, 350);

    if($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoCute").val() == '') {
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function() {
        loadDomosFromServer();
    });

    return false;
};

const handleOmod = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'}, 350);

    if($("#omodName").val() == '' || $("#omodAge").val() == '' || $("#omodEvil").val() == '') {
        console.log("This is the error!");
        handleError("RAWR! All fields are required");
        return false;
    }

    sendAjax('POST', $("#omodForm").attr("action"), $("#omodForm").serialize(), function() {
        loadOmodsFromServer();
    });

    return false;
}

const DomoForm = (props) => {
    return (
        <form id="domoForm"
            onSubmit={handleDomo}
            name="domoForm"
            action="/maker"
            method="POST"
            className="domoForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name"/>
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="text" name="age" placeholder="Domo Age"/>
            <label htmlFor="cute">Cuteness: </label>
            <input id="domoCute" type="text" name="cute" placeholder="Domo Cuteness"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    );
};

const OmodForm = (props) => {
    return (
        <form id="omodForm"
            onSubmit={handleOmod}
            name="omodForm"
            action="/oMaker"
            method="POST"
            className="omodForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="omodName" type="text" name="name" placeholder="Omod Name"/>
            <label htmlFor="age">Age: </label>
            <input id="domodAge" type="text" name="age" placeholder="Omod Age"/>
            <label htmlFor="evil">Evilness: </label>
            <input id="omodEvil" type="text" name="evil" placeholder="Omod Cuteness"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="makeOmodSubmit" type="submit" value="Make Omod" />
        </form>
    );
};

const DomoList = function(props) {
    if (props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos yet</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(function(domo) {
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName"> Name: {domo.name} </h3>
                <h3 className="domoAge"> Age: {domo.age} </h3>
                <h3 className="domoCute">Cuteness: {domo.cute} </h3>
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const OmodList = function(props) {
    if (props.omods.length === 0) {
        return (
            <div className="omodList">
                <h3 className="emptyDomo">No Omods yet</h3>
            </div>
        );
    }

    const omodNodes = props.omods.map(function(omod) {
        return (
            <div key={omod._id} className="omod">
                <img src="/assets/img/domoface.jpeg" alt="omod face" className="omodFace" />
                <h3 className="omodName"> Name: {omod.name} </h3>
                <h3 className="omodAge"> Age: {omod.age} </h3>
                <h3 className="omodEvil">Evilness: {omod.evil} </h3>
            </div>
        );
    });

    return (
        <div className="omodList">
            {omodNodes}
        </div>
    );
}

const loadDomosFromServer = () => {
    sendAjax('GET', '/getDomos', null, (data) => {
        ReactDOM.render(
            <DomoList domos={data.domos} />, document.querySelector("#domos")
        );
    });
};

const loadOmodsFromServer = () => {
    sendAjax('GET', '/getOmods', null, (data) => {
        ReactDOM.render(
            <OmodList omods={data.omods} />, document.querySelector("#omods")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
    );

    ReactDOM.render(
        <OmodForm csrf={csrf} />, document.querySelector("#makeOmod")
    );

    ReactDOM.render(
        <DomoList domos={[]} />, document.querySelector("#domos")
    );

    ReactDOM.render(
        <OmodList omods={[]} />, document.querySelector("#omods")
    );

    loadDomosFromServer();
    loadOmodsFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});