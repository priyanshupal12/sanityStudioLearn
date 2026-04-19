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
        patch.execute([{set: {pageStatus: 'draft'}}, {unset: ['publishAt']}])
        originalResult.onHandle?.()
      },
    }
  }
}

export const pageStatusActionsResolver: DocumentActionsResolver = (prev, context) => {
  if (context.schemaType !== 'PageType') return prev

  return prev.map((action) => {
    if (action.action === 'publish') return createCustomPublishAction(action)
    if (action.action === 'unpublish') return createCustomUnPublishAction(action)
    return action
  })
}
