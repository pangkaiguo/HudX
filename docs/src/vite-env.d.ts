/// <reference types="vite/client" />

type ImportGlobFunction = import('vite').ImportGlobFunction;

interface ImportMeta {
  glob: ImportGlobFunction;
}
