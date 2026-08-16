import { Component } from "react";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center px-3">
                    <h2 className="inter-600 mb-3">Something went wrong</h2>
                    <p className="text-muted mb-4">An unexpected error occurred. Try reloading the page.</p>
                    <button className="btn btn-yellow" onClick={() => window.location.assign('/')}>Back to home</button>
                </div>
            );
        }

        return this.props.children;
    }
}
