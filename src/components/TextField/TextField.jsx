import PropTypes from 'prop-types'
import React, { useState, forwardRef } from 'react'
import styled, { css } from '@xstyled/styled-components'
import { borders, variant } from '@xstyled/system'

import { Flex, Box } from '../Grid'
import { Caption, Typography } from '../Typography'

const TextField = forwardRef(
  (
    {
      borderColor,
      customPrefix,
      customSuffix,
      label,
      message,
      prefix,
      suffix,
      placeholder,
      disabled,
      type,
      name,
      defaultValue,
      value,
      onChange,
      inputProps,
      ...props
    },
    ref
  ) => {
    const [focus, setFocus] = useState(false)
    return (
      <Wrapper disabled={disabled} {...props}>
        <Label>{label}</Label>
        <Container focus={focus} borderColor={borderColor}>
          {prefix ? <Affix forwardedAs='span'>{prefix}</Affix> : customPrefix}
          <InputBase
            ref={ref}
            type={type}
            name={name}
            placeholder={placeholder}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            disabled={disabled}
            value={value}
            onChange={onChange}
            defaultValue={defaultValue}
            {...inputProps}
          />

          {suffix ? <Affix forwardedAs='span'>{suffix}</Affix> : customSuffix}
        </Container>
        {message && <Message>{message}</Message>}
      </Wrapper>
    )
  }
)

TextField.propTypes = {
  borderColor: PropTypes.string,
  label: PropTypes.string,
  message: PropTypes.string,
  customPrefix: PropTypes.object,
  customSuffix: PropTypes.object,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  inputProps: PropTypes.object
}

TextField.defaultProps = {
  borderColor: 'black'
}

const errorVariant = variant({
  prop: 'error',
  default: false,
  variants: {
    true: css`
      p {
        color: error;
      }
      div {
        border-color: error;
        span {
          color: error;
        }
      }
    `,
    false: css``
  }
})

const disabledVariant = variant({
  prop: 'disabled',
  default: false,
  variants: {
    true: css`
      * {
        color: disabled !important;
      }
      div {
        border-color: gray.400;
        background-color: gray.100;
        span {
          color: gray.400;
        }
      }
    `,
    false: css``
  }
})

const focusVariant = variant({
  prop: 'focus',
  default: false,
  variants: {
    true: css`
      border-color: blue.50;
      border-width: 2px;
      padding: 0;
    `,
    false: css``
  }
})

const Wrapper = styled(Box)`
  ${errorVariant}
  ${disabledVariant}
`
const Label = styled(Typography)`
  font-size: 2;
  line-height: 1;
  font-weight: 1;
  margin-bottom: 3;
`
const Container = styled(Flex)`
  border-width: 1px;
  border-style: solid;
  border-radius: 2;
  align-items: center;
  padding: 1px;
  width: 100%;
  ${borders}
  ${focusVariant}
`
const Affix = styled(Typography)`
  font-size: 1;
  line-height: 1;
  margin: 0 3;
  pointer-events: none;
`
const InputBase = styled.input`
  border: 0;
  flex: 1;
  font-size: 3;
  line-height: 3;
  background-color: transparent;
  padding: 6px;
  overflow: hidden;
  width: 100%;

  &::placeholder {
    color: gray.600;
  }
  &:focus {
    outline: none;
  }

  &:disabled {
    ::placeholder {
      color: disabled;
    }
  }
`
const Message = styled(Caption)`
  font-size: 1;
  line-height: 1;
  margin-top: 2;
`

export default TextField
