import React from 'react';
import MonacoEditor from 'react-monaco-editor';

interface Props {
  value: string;
  language?: string;
  height?: number;
  onChange?: (value: string) => void;
}

/**
 * 代码编辑器
 * @constructor
 * @author https://github.com/liyupi
 */
const CodeEditor: React.FC<Props> = (props) => {
  const { value, height = 480, language = 'sql', onChange } = props;

  // const editorDidMount = (editor, monaco) => {
  //   console.log('editorDidMount', editor);
  //   editor.focus();
  // };

  const options = {
    selectOnLineNumbers: true,
    fontSize: 14,
    formatOnPaste: true,
    automaticLayout: true,
    minimap: {
      enabled: false,
    },
  };

  return (
    <MonacoEditor
      height={height}
      language={language}
      theme="vs-dark"
      value={value}
      options={options}
      onChange={onChange}
      // editorDidMount={editorDidMount}
    />
  );
};

export default CodeEditor;
