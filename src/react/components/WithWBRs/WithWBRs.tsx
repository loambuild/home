import { Fragment } from 'react'

/**
 * insert <wbr> (word break opportunity) tags after specified `breakOn` character (default underscore)
 */
export const WithWBRs: React.FC<{
  word: string,
  breakOn?: string,
}> = ({ word, breakOn = '_' }) => (
  <Fragment>
    {word.split(breakOn).map((piece, i) => (
      <Fragment key={i}>
        {i !== 0 && <>{breakOn}<wbr /></>}
        {piece}
      </Fragment>
    ))}
  </Fragment>
)
