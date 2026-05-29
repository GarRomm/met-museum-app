import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-center px-4">
          <p className="text-lg font-medium text-stone-700">Une erreur est survenue.</p>
          <p className="mt-2 text-sm text-stone-500">{this.state.message}</p>
          <button
            className="mt-6 rounded bg-stone-800 px-5 py-2 text-sm text-white hover:bg-stone-700"
            onClick={() => this.setState({ hasError: false, message: '' })}
          >
            Réessayer
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
