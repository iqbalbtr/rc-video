import { StyleSheet, Text, Touchable, TouchableHighlight, View } from 'react-native'
import React, { createContext, ReactNode, useContext, useState } from 'react'

type Context = {
    isToggle: boolean,
    handleToggle: (value?: boolean) => void;
}

const Context = createContext({
    isToggle: false,
    handleToggle: (value?: boolean) => { }
})

export const useToggle = () => {
    return useContext(Context);
}

const ModalContext = ({
    children
}: {
    children: ReactNode
}) => {

    const [isToggle, setToggle] = useState(false);

    const handleToggle = (value?: boolean) => {
        return setToggle(pv => value ?? !pv);
    }

    return (
        <Context.Provider
        value={{
            handleToggle: handleToggle,
            isToggle: isToggle
        }}
        >
            <TouchableHighlight
                onPress={() => handleToggle()}
                style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "red",
                    position: "absolute",
                    top: 0,
                    left: 0
                }}
            >
                {children}
            </TouchableHighlight>
        </Context.Provider>
    )
}

export default ModalContext

const styles = StyleSheet.create({})