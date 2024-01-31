package util

type AuthProviderInterface interface {
}

type PasswordAuthProvider struct {
}

type EmailAuthProvider struct {
}

type PhoneAuthProvider struct {
}

type VerificationCodeAuthProvider struct {
}

type GoogleAuthProvider struct {
}

// factory method to generate the correct provider
func GenerateAuthProvider(providerName string) AuthProviderInterface {
	switch providerName {
	case "password":
		return &PasswordAuthProvider{}
	case "email":
		return &EmailAuthProvider{}
	case "phone":
		return &PhoneAuthProvider{}
	case "verificationCode":
		return &VerificationCodeAuthProvider{}
	case "google":
		return &GoogleAuthProvider{}
	}
	return nil
}
