import { memo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CodeBlock from './CodeBlock'

const components = {
  pre: CodeBlock,
  a: ({ node: _node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
  table: ({ node: _node, ...props }) => (
    <div className="my-4 overflow-x-auto">
      <table {...props} />
    </div>
  ),
}

// react-markdown does not render raw HTML, so model output cannot inject markup.
function MarkdownContent({ content }) {
  return (
    <div className="markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default memo(MarkdownContent)
