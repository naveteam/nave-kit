import React, { Fragment, useCallback, useMemo, useEffect, useState } from 'react'
import { useDebounce } from '@naveteam/prometheus'
import styled, { css } from '@xstyled/styled-components'
import { th } from '@xstyled/system'
import PropTypes from 'prop-types'

import { Button, Icon, Paragraph } from '..'
import { Flex as Container } from '../Grid'

const getLowerValue = (valueA, valueB) => {
  if (valueA > valueB) {
    return valueB
  }
  return valueA
}

const Pagination = ({
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  minPagesToShowDots,
  lastPageBeforeFirstDots,
  pagesShownedBetweenDots,
  variant,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(page)
  const debouncedValue = useDebounce(inputValue)

  useEffect(() => {
    variant === 'input' && setInputValue(page)
  }, [page, variant])

  useEffect(() => {
    debouncedValue <= pageSize && debouncedValue > 0 && setPage(debouncedValue)
  }, [debouncedValue])

  const setPage = useCallback(
    pageNumber => {
      onPageChange && onPageChange(pageNumber)
    },
    [onPageChange]
  )

  const showPagesInMiddle = direction => {
    if (direction === 'before') {
      return Array.from({ length: prevLength }).map((_, index) => {
        const pagesBefore = page - (prevLength - index)
        return (
          <ButtonPage caption={pagesBefore} key={pagesBefore} hover variant='text' onClick={() => setPage(pagesBefore)} />
        )
      })
    } else if (direction === 'after') {
      return Array.from({ length: nextLength }).map((_, index) => {
        const pagesAfter = page + index + 1
        return (
          <ButtonPage caption={pagesAfter} key={pagesAfter} hover variant='text' onClick={() => setPage(pagesAfter)} />
        )
      })
    }
  }

  const getPages = useCallback(
    state => {
      const prevLength = getLowerValue(middle, page - 1)
      const nextLength = getLowerValue(middle, pageSize - page)
      if (state === 'prev') {
        return pageSize > minPagesToShowDots ? getLowerValue(middle + middle - nextLength, page - 1) : page - 1
      }

      return pageSize > minPagesToShowDots
        ? getLowerValue(middle + middle - prevLength, pageSize - page)
        : pageSize - page
    },
    [page, pageSize, middle, minPagesToShowDots]
  )

  const middle = useMemo(() => Math.trunc(pagesShownedBetweenDots / 2), [pagesShownedBetweenDots])
  const prevLength = useMemo(() => getPages('prev'), [getPages])
  const nextLength = useMemo(() => getPages('next'), [getPages])

  const showFirstDots = page > lastPageBeforeFirstDots && pageSize > minPagesToShowDots
  const showLastDots = page < pageSize - (lastPageBeforeFirstDots - 1) && pageSize > minPagesToShowDots

  return (
    <Container {...props}>
      <Icon
        mr={2}
        color='gray.700'
        cursor='pointer'
        onClick={() => page != 1 && setPage(page - 1)}
        icon='chevron-left'
      />
      {variant === 'input' ? (
        <Container alignItems='center'>
          <Input value={inputValue} onChange={event => setInputValue(Number(event.target.value))} />
          <Paragraph variant='sm' ml={3} color='gray.800'>
            de
          </Paragraph>
          <Paragraph variant='sm' ml={2} mr={2} color='gray.800'>
            {pageSize}
          </Paragraph>
        </Container>
      ) : (
        <Fragment>
          {showFirstDots && (
            <Fragment>
              <ButtonPage variant='text' hover onClick={() => setPage(1)} caption='1' />
              {!showLastDots && (
                <Fragment>
                  <ButtonPage variant='text' hover onClick={() => setPage(2)} caption='2' />
                  <ButtonPage variant='text' hover onClick={() => setPage(3)} caption='3' />
                </Fragment>
              )}
              <ButtonPage variant='text' hover onClick={() => setPage(page - prevLength - 1)} caption='...' />
            </Fragment>
          )}
          {showPagesInMiddle('before')}
          <ButtonPage selected onClick={() => setPage(page)} caption={page} />
          {showPagesInMiddle('after')}
          {showLastDots && (
            <Fragment>
              <ButtonPage variant='text' hover onClick={() => setPage(page + nextLength + 1)} caption='...' />
              {!showFirstDots && (
                <Fragment>
                  <ButtonPage caption={pageSize - 2} variant='text' hover onClick={() => setPage(pageSize - 2)} />
                  <ButtonPage caption={pageSize - 1} variant='text' hover onClick={() => setPage(pageSize - 1)} />
                </Fragment>
              )}
              <ButtonPage variant='text' hover onClick={() => setPage(pageSize)} caption={pageSize} />
            </Fragment>
          )}
        </Fragment>
      )}

      <Icon
        color='gray.700'
        cursor='pointer'
        icon='chevron-right'
        onClick={() => page != pageSize && setPage(page + 1)}
      />
    </Container>
  )
}

const Input = styled.input`
  width: 28px;
  height: 20px;
  font-size: ${th.fontSize(1)};
  font-family: 'Open Sans';
  padding: 1px;
  text-align: center;
  border: 1px solid ${th.color('gray.500')};
  border-radius: 2px;
  &:focus {
    outline: none;
    border-color: ${th.color('blue.50')};
    border-width: 2px;
    padding: 0;
  }
`

const ButtonPage = styled(Button)`
  margin-right: 4px;
  width: 24px;
  height: 24px;
  min-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${th.color('gray.800')};

  p {
    font-size: ${th.fontSize(2)};
    line-height: ${th.lineHeight(1)};
  }

  ${props =>
    props.selected &&
    css`
      color: white;
    `}

  ${props =>
    props.hover &&
    css`
      &:hover {
        background-color: rgba(78, 152, 237, 0.15);
      }
    `}
`
Pagination.defaultProps = {
  page: 1,
  minPagesToShowDots: 7,
  lastPageBeforeFirstDots: 3,
  pagesShownedBetweenDots: 3
}

Pagination.propTypes = {
  page: PropTypes.number,
  pageSize: PropTypes.number,
  minPagesToShowDots: PropTypes.number,
  lastPageBeforeFirstDots: PropTypes.number,
  pagesShownedBetweenDots: PropTypes.number
}

export default Pagination
