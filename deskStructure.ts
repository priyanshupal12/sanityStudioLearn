import type {StructureResolver} from 'sanity/structure'

const singletonItem = (
  S: Parameters<StructureResolver>[0],
  title: string,
  schemaType: string,
  documentId: string,
) => S.listItem().title(title).child(S.document().schemaType(schemaType).documentId(documentId))

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('content')
    .items([
      singletonItem(S, 'Site Header', 'header', 'header'),
      singletonItem(S, 'Site Footer', 'footer', 'footer'),
      S.divider(),
      S.listItem().title('Posts').child(S.documentTypeList('post')),
      S.listItem().title('PageType').child(S.documentTypeList('pageType')),
      S.listItem().title('Shared Section').child(S.documentTypeList('sharedSection')),
    ])
