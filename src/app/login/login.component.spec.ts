import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    const loginForm = component.loginForm;
    expect(loginForm.value).toEqual({ email: '', password: '' });
  });

  it('should mark the form as invalid if fields are empty', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should mark the form as invalid if email is not valid', () => {
    component.loginForm.controls['email'].setValue('invalid-email');
    component.loginForm.controls['password'].setValue('password123');
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should mark the form as valid if fields are filled correctly', () => {
    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should authenticate successfully with valid credentials', () => {
    const mockUser = {
      user: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    };
    spyOn(localStorage, 'setItem');
    spyOn(JSON, 'stringify').and.returnValue(JSON.stringify(mockUser));

    // Mock authMocks
    (component as any).authMocks = [mockUser];

    component.loginForm.controls['email'].setValue('test@example.com');
    component.loginForm.controls['password'].setValue('password123');
    component.onSubmit();

    expect(component.authenticated).toBeTrue();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify({ email: 'test@example.com', name: 'Test User' })
    );
  });

  it('should fail authentication with invalid credentials', () => {
    component.loginForm.controls['email'].setValue('wrong@example.com');
    component.loginForm.controls['password'].setValue('wrongpassword');
    component.onSubmit();

    expect(component.authenticated).toBeFalse();
  });

  it('should not authenticate if the form is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    component.onSubmit();

    expect(component.authenticated).toBeNull();
  });

  it('should reset authentication state on logout', () => {
    spyOn(localStorage, 'removeItem');
    component.logout();

    expect(component.authenticated).toBeFalse();
    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
  });
});
