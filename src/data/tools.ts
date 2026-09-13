export interface Tool {
  slug: string;
  name: string;
  description: string;
  path: string;
  status: 'available' | 'coming-soon';
  icon: string;
}

const baseUrl = import.meta.env.BASE_URL;
const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

export const tools: Tool[] = [
  {
    slug: 'json-formatter',
    name: 'Formateador de JSON',
    description:
      'Formatea y minimiza JSON con indentación de 2 espacios, 4 espacios o tab.',
    path: `${base}tools/json-formatter/`,
    status: 'available',
    icon: '{}',
  },
  {
    slug: 'json-cleaner',
    name: 'Limpiador de JSON',
    description:
      'Quita las diagonales de escape de un JSON encapsulado y lo deja formateado y listo para usar.',
    path: `${base}tools/json-cleaner/`,
    status: 'available',
    icon: '\\"',
  },
  {
    slug: 'xml-formatter',
    name: 'Formateador de XML',
    description:
      'Formatea y minimiza XML con indentación de 2 espacios, 4 espacios o tab.',
    path: `${base}tools/xml-formatter/`,
    status: 'available',
    icon: '<>',
  },
  {
    slug: 'password-generator',
    name: 'Generador de Contraseñas',
    description:
      'Genera contraseñas seguras con longitud configurable, símbolos y exclusión de caracteres.',
    path: `${base}tools/password-generator/`,
    status: 'available',
    icon: '#',
  },
];