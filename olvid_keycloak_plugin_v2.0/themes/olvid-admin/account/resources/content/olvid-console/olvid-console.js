import * as React from "../../../../common/keycloak/web_modules/react.js";

export class OlvidConsole extends React.Component {

    render() {
        const e = React.createElement;
        return e('div', {id:'content'}, [
            e('p', {id:'label'}, 'Click to open your Olvid console:'),
            e('a', {id:'buttonLink', href:"/olvid"}, [
                e('div', {id:'button'}, `Open Olvid Admin Console`)
            ])
        ])
    }
};