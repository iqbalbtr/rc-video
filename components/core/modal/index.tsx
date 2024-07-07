import { ReactNode, useState } from "react"
import { Alert, Modal } from "react-native";


const ModalLayout = ({
    children,
    prefix
}: {
    children: (close: () => void, isTgl?: boolean) => ReactNode,
    prefix: (close: () => void, isTgl?: boolean) => ReactNode
}) => {

    const [isTgl, setTgl] = useState(false);

    return (
        <>
        {prefix(() => setTgl(pv => !pv), isTgl)}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isTgl}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                {children(() => setTgl(pv => !pv), isTgl)}
            </Modal>
        </>
    )
}

export default ModalLayout;