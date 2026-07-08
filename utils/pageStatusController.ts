import {
  type DocumentActionComponent,
  type DocumentActionsResolver,
  useDocumentOperation,
} from 'sanity'

const createCustomPublishAction = (
  originalPublishAction: DocumentActionComponent,
): DocumentActionComponent => {
  return (props) => {
    const {patch} = useDocumentOperation(props.id, props.type)
    const originalResult = originalPublishAction(props)
    if (!originalResult) return null

    return {
      ...originalResult,
      onHandle: () => {
        patch.execute([{set: {pageStatus: 'published', publishAt: new Date().toISOString()}}])
        originalResult.onHandle?.()
      },
    }
  }
}

const createCustomUnPublishAction = (
  originalUnpublishAction: DocumentActionComponent,
): DocumentActionComponent => {
  return (props) => {
    const {patch} = useDocumentOperation(props.id, props.type)
    const originalResult = originalUnpublishAction(props)
    if (!originalResult) return null

    return {
      ...originalResult,
      onHandle: () => {
        // If there is no draft, patching will create a "sparse" draft with only the patched fields.
        // When unpublish then deletes the published document, all other data is lost.
        // To fix this, we copy all published data into the draft patch if no draft exists.
        const publishedData = props.published || {}
        const { _id, _createdAt, _updatedAt, _rev, publishAt, ...restPublished } = publishedData as any
        
        const setPayload = props.draft 
          ? { pageStatus: 'draft' }
          : { ...restPublished, pageStatus: 'draft' }

        patch.execute([{set: setPayload}, {unset: ['publishAt']}])
        originalResult.onHandle?.()
      },
    }
  }
}

export const pageStatusActionsResolver: DocumentActionsResolver = (prev, context) => {
  if (context.schemaType !== 'pageType') return prev

  return prev.map((action) => {
    if (action.action === 'publish') return createCustomPublishAction(action)
    if (action.action === 'unpublish') return createCustomUnPublishAction(action)
    return action
  })
}
