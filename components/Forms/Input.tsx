import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Input = ({
  label,
  textInputConfig,
  containerStyle,
}: {
  label: string;
  textInputConfig?: TextInputProps;
  containerStyle?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...textInputConfig}
        style={[
          styles.input,
          textInputConfig?.multiline && styles.inputMultiline,
          !textInputConfig?.editable && styles.inputDisabled,
        ]}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.color1,
    color: GlobalStyles.colors.color700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputDisabled: {
    color: GlobalStyles.colors.color3,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
