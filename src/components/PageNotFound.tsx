import { FunctionComponent } from "react";

interface PageNotFoundProps {

}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    return (
        <>
            <h3 className="display-3 text-center">PAGE NOT FOUND!</h3>
        </>
    )
}

export default PageNotFound;