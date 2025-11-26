export interface Lesson {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  codeExample?: string;
  quiz?: Quiz;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const lessons: Lesson[] = [
  {
    id: "intro",
    title: "Introduction to Angular",
    category: "Getting Started",
    difficulty: "beginner",
    description: "Learn what Angular is and why it's used for building modern web applications.",
    content: `Angular is a comprehensive, TypeScript-based framework for building scalable web applications. Created and maintained by Google, it provides a complete solution with built-in features for routing, forms, HTTP client, and more.

**Key Features:**
- Component-based architecture
- Two-way data binding
- Dependency injection
- Powerful CLI for scaffolding
- Built-in routing and forms
- RxJS for reactive programming

Angular is perfect for enterprise applications that need structure, maintainability, and scalability.`,
    codeExample: `// A simple Angular component
import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  template: `
    <div class="welcome">
      <h1>{{ title }}</h1>
      <p>Welcome to Angular!</p>
    </div>
  `,
  styles: [`.welcome { text-align: center; }`]
})
export class WelcomeComponent {
  title = 'My Angular App';
}`,
    quiz: {
      question: "What language is Angular primarily built with?",
      options: ["JavaScript", "TypeScript", "CoffeeScript", "Dart"],
      correctAnswer: 1,
      explanation: "Angular is built with TypeScript, which provides static typing and enhanced tooling support."
    }
  },
  {
    id: "components",
    title: "Components & Templates",
    category: "Core Concepts",
    difficulty: "beginner",
    description: "Master the building blocks of Angular applications - components and their templates.",
    content: `Components are the fundamental building blocks of Angular applications. Each component consists of:

**Component Parts:**
- **Class**: Contains the logic and data
- **Template**: Defines the view (HTML)
- **Styles**: Component-specific CSS
- **Metadata**: @Component decorator with configuration

Components are reusable, testable, and encapsulated. They control a portion of the screen called a view.`,
    codeExample: `import { Component } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <div class="user-card">
      <h3>User Card</h3>
      <p>Name: {{ name }}</p>
      <p>Role: {{ role }}</p>
      <button (click)="promoteUser()">Promote</button>
    </div>
  `,
  styles: [`
    .user-card {
      border: 1px solid #ddd;
      padding: 16px;
      border-radius: 8px;
      margin: 16px;
    }
  `]
})
export class UserCardComponent {
  name = 'John Doe';
  role = 'User';

  promoteUser() {
    this.role = 'Admin';
  }
}`,
    quiz: {
      question: "What decorator is used to define an Angular component?",
      options: ["@Module", "@Component", "@Injectable", "@Directive"],
      correctAnswer: 1,
      explanation: "@Component is the decorator that marks a class as an Angular component and provides metadata."
    }
  },
  {
    id: "data-binding",
    title: "Data Binding",
    category: "Core Concepts",
    difficulty: "beginner",
    description: "Learn the four types of data binding in Angular for powerful component interaction.",
    content: `Angular provides four types of data binding to coordinate between components and templates:

**1. Interpolation {{ }}** - One-way from component to view
Displays component data in the template.

**2. Property Binding [ ]** - One-way from component to view
Sets element properties dynamically from component data.

**3. Event Binding ( )** - One-way from view to component
Responds to user events like clicks, typing, etc.

**4. Two-way Binding [( )]** - Bidirectional synchronization
Combines property and event binding. Most commonly used with **ngModel**, which keeps form inputs and component data in sync automatically. When the user types in an input, the component property updates. When the component changes the property, the input updates.

Note: To use ngModel, you need to import FormsModule in your Angular module.

These bindings enable reactive UIs that automatically update when data changes.`,
    codeExample: `import { Component } from '@angular/core';

@Component({
  selector: 'app-binding-demo',
  template: `
    <!-- Interpolation -->
    <h1>{{ title }}</h1>
    
    <!-- Property binding -->
    <img [src]="imageUrl" [alt]="imageAlt">
    
    <!-- Event binding -->
    <button (click)="handleClick()">Click Me</button>
    
    <!-- Two-way binding -->
    <input [(ngModel)]="username" placeholder="Enter name">
    <p>Hello, {{ username }}!</p>
  `
})
export class BindingDemoComponent {
  title = 'Data Binding Demo';
  imageUrl = 'assets/logo.png';
  imageAlt = 'Angular logo';
  username = '';

  handleClick() {
    console.log('Button clicked!');
  }
}`,
    quiz: {
      question: "Which syntax is used for two-way data binding in Angular?",
      options: ["{{ }}", "[ ]", "( )", "[( )]"],
      correctAnswer: 3,
      explanation: "[( )] combines property and event binding for two-way data binding, commonly used with ngModel."
    }
  },
  {
    id: "directives",
    title: "Directives",
    category: "Core Concepts",
    difficulty: "intermediate",
    description: "Understand structural and attribute directives to manipulate the DOM dynamically.",
    content: `Directives are classes that add behavior to elements in Angular applications. There are three types:

**Structural Directives** - Change DOM layout by adding/removing elements
- *ngIf - Conditionally render elements
- *ngFor - Repeat elements for each item in an array
- *ngSwitch - Switch between multiple views

**Attribute Directives** - Change appearance or behavior without changing structure
- ngClass - Dynamically add/remove CSS classes
- ngStyle - Dynamically add/remove inline styles
- ngModel - Creates two-way data binding (updates component when input changes and vice versa)

**Custom Directives** - Create your own reusable behaviors

Note: ngModel was covered in the Data Binding lesson - it's listed here as an attribute directive because it modifies the behavior of form elements.`,
    codeExample: `import { Component } from '@angular/core';

@Component({
  selector: 'app-directives-demo',
  template: `
    <!-- *ngIf -->
    <div *ngIf="isLoggedIn">
      Welcome back, {{ username }}!
    </div>
    
    <!-- *ngFor -->
    <ul>
      <li *ngFor="let item of items; let i = index">
        {{ i + 1 }}. {{ item }}
      </li>
    </ul>
    
    <!-- ngClass -->
    <div [ngClass]="{
      'active': isActive,
      'disabled': !isActive
    }">
      Status indicator
    </div>
    
    <!-- ngStyle -->
    <div [ngStyle]="{
      'color': textColor,
      'font-size': fontSize + 'px'
    }">
      Styled text
    </div>
  `
})
export class DirectivesDemoComponent {
  isLoggedIn = true;
  username = 'John';
  items = ['Angular', 'React', 'Vue'];
  isActive = true;
  textColor = 'blue';
  fontSize = 16;
}`,
    quiz: {
      question: "What's the difference between *ngIf and [hidden]?",
      options: [
        "No difference",
        "*ngIf removes elements from DOM, [hidden] only hides them",
        "[hidden] is faster",
        "*ngIf is deprecated"
      ],
      correctAnswer: 1,
      explanation: "*ngIf actually removes or adds elements to the DOM, while [hidden] only toggles CSS display."
    }
  },
  {
    id: "services-di",
    title: "Services & Dependency Injection",
    category: "Architecture",
    difficulty: "intermediate",
    description: "Create reusable services and leverage Angular's powerful dependency injection system.",
    content: `Services are singleton classes that provide specific functionality across your application. Angular's Dependency Injection (DI) makes services easy to use and test.

**Benefits:**
- Share data and logic between components
- Separate concerns and improve maintainability
- Easy to test with mock services
- Automatic instance management

Services are perfect for HTTP calls, data management, logging, and business logic.`,
    codeExample: `// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Available app-wide
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}

// Using the service in a component
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  template: `
    <div *ngFor="let user of users">
      {{ user.name }}
    </div>
  `
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => this.users = users
    );
  }
}`,
    quiz: {
      question: "What does 'providedIn: root' mean in @Injectable?",
      options: [
        "Service is provided in the root component",
        "Service is a singleton available application-wide",
        "Service must be in the root folder",
        "Service can only be used by the root module"
      ],
      correctAnswer: 1,
      explanation: "'providedIn: root' creates a singleton service available throughout the entire application."
    }
  },
  {
    id: "routing",
    title: "Routing & Navigation",
    category: "Navigation",
    difficulty: "intermediate",
    description: "Implement navigation between views with Angular's powerful routing system.",
    content: `Angular's Router enables navigation between different views in your single-page application. It supports:

**Key Features:**
- Route parameters and query parameters
- Child routes and nested routing
- Route guards for protection
- Lazy loading for performance
- Preloading strategies

The router maintains browser history and enables deep linking to application states.`,
    codeExample: `// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'user/:id', 
    component: UserDetailComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// Using in a component
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  template: `
    <button (click)="goBack()">Back</button>
    <h1>User {{ userId }}</h1>
  `
})
export class UserDetailComponent {
  userId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userId = this.route.snapshot.params['id'];
  }

  goBack() {
    this.router.navigate(['/']);
  }
}`,
    quiz: {
      question: "What is lazy loading in Angular routing?",
      options: [
        "Loading routes slowly",
        "Loading modules only when needed",
        "Delaying route navigation",
        "A deprecated feature"
      ],
      correctAnswer: 1,
      explanation: "Lazy loading loads feature modules only when their routes are accessed, improving initial load time."
    }
  },
  {
    id: "forms",
    title: "Forms (Template & Reactive)",
    category: "Forms",
    difficulty: "intermediate",
    description: "Build powerful forms using both template-driven and reactive approaches.",
    content: `Angular provides two approaches to handling forms:

**Template-Driven Forms:**
- Easier for simple scenarios
- Uses directives in templates
- Two-way data binding with [(ngModel)]
- Less control, more "magic"

**Reactive Forms:**
- More powerful and flexible
- Defined in component class
- Better for complex validation
- Easier to test
- Recommended for most cases

Both support validation, error handling, and dynamic forms.`,
    codeExample: `// Reactive Form Example
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <div>
        <label>Name:</label>
        <input formControlName="name">
        <div *ngIf="userForm.get('name')?.invalid && 
                    userForm.get('name')?.touched">
          Name is required
        </div>
      </div>

      <div>
        <label>Email:</label>
        <input formControlName="email" type="email">
        <div *ngIf="userForm.get('email')?.invalid && 
                    userForm.get('email')?.touched">
          Valid email required
        </div>
      </div>

      <div formGroupName="address">
        <label>City:</label>
        <input formControlName="city">
      </div>

      <button type="submit" [disabled]="userForm.invalid">
        Submit
      </button>
    </form>
  `
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        city: ['']
      })
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
}`,
    quiz: {
      question: "What's the main advantage of Reactive Forms over Template-Driven Forms?",
      options: [
        "Easier to learn",
        "Better for simple forms",
        "More testable and better for complex validation",
        "Requires less code"
      ],
      correctAnswer: 2,
      explanation: "Reactive forms are more testable, provide better control for complex scenarios, and handle validation more elegantly."
    }
  },
  {
    id: "http-observables",
    title: "HTTP Client & Observables",
    category: "Data Management",
    difficulty: "intermediate",
    description: "Make HTTP requests and work with RxJS Observables for asynchronous operations.",
    content: `Angular's HttpClient uses RxJS Observables for handling asynchronous operations. This provides powerful operators for transforming, combining, and managing data streams.

**Key Concepts:**
- HttpClient for HTTP requests
- Observables for async data streams
- RxJS operators (map, filter, catchError, etc.)
- Subscribe to consume data
- Unsubscribe to prevent memory leaks

Observables are lazy - they don't execute until subscribed to.`,
    codeExample: `import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, catchError, takeUntil } from 'rxjs/operators';

interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-http-demo',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">{{ error }}</div>
    <div *ngFor="let user of users">
      {{ user.name }} - {{ user.email }}
    </div>
  `
})
export class HttpDemoComponent implements OnInit, OnDestroy {
  users: User[] = [];
  loading = false;
  error = '';
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.get<User[]>('https://api.example.com/users', { headers })
      .pipe(
        map(users => users.filter(u => u.name.length > 3)),
        catchError(error => {
          this.error = 'Failed to load users';
          return [];
        }),
        takeUntil(this.destroy$) // Auto-unsubscribe
      )
      .subscribe(users => {
        this.users = users;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,
    quiz: {
      question: "Why should you unsubscribe from Observables?",
      options: [
        "It's not necessary",
        "To prevent memory leaks",
        "To improve performance",
        "Angular requires it"
      ],
      correctAnswer: 1,
      explanation: "Unsubscribing prevents memory leaks by stopping subscriptions when components are destroyed."
    }
  },
  {
    id: "lifecycle",
    title: "Lifecycle Hooks",
    category: "Advanced Concepts",
    difficulty: "advanced",
    description: "Understand component lifecycle and use hooks to tap into key moments.",
    content: `Angular provides lifecycle hooks to tap into key moments in a component's lifetime:

**Common Hooks:**
- **ngOnInit**: Initialize component, fetch data
- **ngOnChanges**: Respond to input property changes
- **ngOnDestroy**: Cleanup, unsubscribe
- **ngAfterViewInit**: Access child components
- **ngDoCheck**: Custom change detection

**Order:** Constructor → ngOnChanges → ngOnInit → ngDoCheck → ngAfterContentInit → ngAfterContentChecked → ngAfterViewInit → ngAfterViewChecked → ngOnDestroy

Use these hooks to control initialization, react to changes, and clean up resources.`,
    codeExample: `import { 
  Component, OnInit, OnDestroy, OnChanges,
  Input, SimpleChanges, AfterViewInit, ViewChild
} from '@angular/core';

@Component({
  selector: 'app-lifecycle-demo',
  template: `
    <h2>{{ title }}</h2>
    <p #contentParagraph>Content goes here</p>
  `
})
export class LifecycleDemoComponent 
  implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  
  @Input() title!: string;
  @ViewChild('contentParagraph') paragraph!: any;
  
  private intervalId: any;

  constructor() {
    console.log('1. Constructor called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('2. ngOnChanges:', changes);
    if (changes['title']) {
      console.log('Title changed to:', changes['title'].currentValue);
    }
  }

  ngOnInit() {
    console.log('3. ngOnInit - Component initialized');
    // Perfect place for data fetching
    this.startTimer();
  }

  ngAfterViewInit() {
    console.log('4. ngAfterViewInit - View initialized');
    console.log('Can now access:', this.paragraph);
  }

  ngOnDestroy() {
    console.log('5. ngOnDestroy - Cleanup');
    // Important: cleanup subscriptions, intervals, etc.
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startTimer() {
    this.intervalId = setInterval(() => {
      console.log('Timer tick');
    }, 1000);
  }
}`,
    quiz: {
      question: "Which lifecycle hook is best for making HTTP requests?",
      options: ["constructor", "ngOnChanges", "ngOnInit", "ngAfterViewInit"],
      correctAnswer: 2,
      explanation: "ngOnInit is the recommended hook for initialization logic like HTTP requests, as the component is fully set up."
    }
  },
  {
    id: "pipes",
    title: "Pipes & Transformations",
    category: "Advanced Concepts",
    difficulty: "intermediate",
    description: "Transform data in templates with built-in and custom pipes.",
    content: `Pipes transform displayed values in templates without changing the underlying data. Angular provides many built-in pipes and you can create custom ones.

**Built-in Pipes:**
- **DatePipe**: Format dates
- **CurrencyPipe**: Format currency
- **DecimalPipe**: Format numbers
- **PercentPipe**: Format percentages
- **JsonPipe**: Display JSON for debugging
- **UpperCasePipe/LowerCasePipe**: Change case
- **SlicePipe**: Extract array/string portions
- **AsyncPipe**: Subscribe to Observables

Pipes are chainable and can accept parameters.`,
    codeExample: `// Using built-in pipes
import { Component } from '@angular/core';

@Component({
  selector: 'app-pipes-demo',
  template: `
    <!-- Date pipe -->
    <p>{{ today | date:'fullDate' }}</p>
    <p>{{ today | date:'short' }}</p>

    <!-- Currency pipe -->
    <p>{{ price | currency:'USD':'symbol':'1.2-2' }}</p>

    <!-- Decimal pipe -->
    <p>{{ pi | number:'1.2-5' }}</p>

    <!-- Uppercase/Lowercase -->
    <p>{{ name | uppercase }}</p>
    <p>{{ name | lowercase }}</p>

    <!-- Chaining pipes -->
    <p>{{ today | date:'short' | uppercase }}</p>

    <!-- Async pipe (auto-subscribes) -->
    <p>{{ users$ | async | json }}</p>
  `
})
export class PipesDemoComponent {
  today = new Date();
  price = 1234.56;
  pi = 3.14159265359;
  name = 'Angular Developer';
  users$ = of([{ name: 'John' }, { name: 'Jane' }]);
}

// Custom pipe example
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponential'
})
export class ExponentialPipe implements PipeTransform {
  transform(value: number, exponent = 1): number {
    return Math.pow(value, exponent);
  }
}

// Usage: {{ 2 | exponential:3 }} outputs 8`,
    quiz: {
      question: "What's special about the AsyncPipe?",
      options: [
        "It makes code faster",
        "It automatically subscribes and unsubscribes from Observables",
        "It's deprecated",
        "It only works with Promises"
      ],
      correctAnswer: 1,
      explanation: "AsyncPipe automatically subscribes to Observables and unsubscribes when the component is destroyed, preventing memory leaks."
    }
  },
  {
    id: "state-management",
    title: "State Management",
    category: "Advanced Concepts",
    difficulty: "advanced",
    description: "Manage application state effectively with services, RxJS, and NgRx.",
    content: `Managing state across your application is crucial for complex apps. Angular offers several approaches:

**Strategies:**
1. **Services with BehaviorSubject**: Simple, effective for medium apps
2. **NgRx**: Redux-pattern, best for large enterprise apps
3. **Akita**: Simpler than NgRx, powerful features
4. **Signals (Angular 16+)**: New reactive primitive

**When to use what:**
- Small apps: Component state + services
- Medium apps: Services with RxJS
- Large apps: NgRx or Akita

The key is predictable state updates and avoiding prop drilling.`,
    codeExample: `// State management with BehaviorSubject
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private initialState: AppState = {
    user: null,
    theme: 'light',
    notifications: []
  };

  private state$ = new BehaviorSubject<AppState>(this.initialState);

  // Expose state as Observable
  getState(): Observable<AppState> {
    return this.state$.asObservable();
  }

  // Selectors
  getUser(): Observable<User | null> {
    return this.state$.pipe(
      map(state => state.user)
    );
  }

  getTheme(): Observable<string> {
    return this.state$.pipe(
      map(state => state.theme)
    );
  }

  // Actions
  setUser(user: User | null) {
    this.updateState({ user });
  }

  toggleTheme() {
    const currentTheme = this.state$.value.theme;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.updateState({ theme: newTheme });
  }

  addNotification(notification: Notification) {
    const notifications = [
      ...this.state$.value.notifications,
      notification
    ];
    this.updateState({ notifications });
  }

  private updateState(partial: Partial<AppState>) {
    this.state$.next({
      ...this.state$.value,
      ...partial
    });
  }
}

// Using in component
@Component({
  selector: 'app-header',
  template: `
    <div [class.dark-mode]="(theme$ | async) === 'dark'">
      <span *ngIf="user$ | async as user">{{ user.name }}</span>
      <button (click)="toggleTheme()">Toggle Theme</button>
    </div>
  `
})
export class HeaderComponent {
  user$ = this.stateService.getUser();
  theme$ = this.stateService.getTheme();

  constructor(private stateService: StateService) {}

  toggleTheme() {
    this.stateService.toggleTheme();
  }
}`,
    quiz: {
      question: "What's the main benefit of centralized state management?",
      options: [
        "Faster performance",
        "Less code",
        "Predictable state updates and easier debugging",
        "Better styling"
      ],
      correctAnswer: 2,
      explanation: "Centralized state management makes state changes predictable, easier to debug, and prevents inconsistencies across the app."
    }
  },
  {
    id: "testing",
    title: "Testing (Unit & E2E)",
    category: "Testing",
    difficulty: "advanced",
    description: "Write comprehensive tests for your Angular applications.",
    content: `Testing ensures your application works correctly and prevents regressions. Angular provides excellent testing tools:

**Unit Testing (Jasmine + Karma):**
- Test individual components and services
- Mock dependencies
- Test component logic and templates
- Fast and focused

**E2E Testing (Protractor/Cypress):**
- Test complete user workflows
- Simulate real user interactions
- Slower but comprehensive

**Best Practices:**
- Test behavior, not implementation
- Use TestBed for component testing
- Mock HTTP calls with HttpClientTestingModule
- Aim for good coverage but focus on critical paths`,
    codeExample: `// Component unit test
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    // Create spy object
    const spy = jasmine.createSpyObj('UserService', ['getUsers']);

    await TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    const mockUsers = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' }
    ];
    
    userService.getUsers.and.returnValue(of(mockUsers));
    
    fixture.detectChanges(); // Triggers ngOnInit
    
    expect(component.users).toEqual(mockUsers);
    expect(userService.getUsers).toHaveBeenCalled();
  });

  it('should display user names', () => {
    const mockUsers = [{ id: 1, name: 'John' }];
    userService.getUsers.and.returnValue(of(mockUsers));
    
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('John');
  });
});

// Service unit test
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch users', () => {
    const mockUsers = [{ id: 1, name: 'John' }];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});`,
    quiz: {
      question: "What is TestBed used for in Angular testing?",
      options: [
        "E2E testing only",
        "Creating a testing module and configuring the test environment",
        "Performance testing",
        "Styling tests"
      ],
      correctAnswer: 1,
      explanation: "TestBed is Angular's primary API for configuring and initializing the test environment for unit tests."
    }
  },
  {
    id: "performance",
    title: "Performance Optimization",
    category: "Advanced Concepts",
    difficulty: "advanced",
    description: "Optimize your Angular app for maximum performance.",
    content: `Performance is crucial for user experience. Angular provides several optimization techniques:

**Change Detection:**
- Use OnPush strategy for less frequent checks
- Detach change detector when needed
- Use trackBy with *ngFor

**Lazy Loading:**
- Load feature modules on demand
- Reduce initial bundle size
- Preload strategies for better UX

**Build Optimization:**
- AOT compilation (default in production)
- Tree shaking to remove unused code
- Bundle budgets to monitor size
- Code splitting

**Runtime Optimization:**
- Virtual scrolling for long lists
- Memoization with pure pipes
- Avoid expensive operations in templates
- Use Web Workers for heavy computations`,
    codeExample: `// OnPush Change Detection
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <div class="card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
  @Input() user!: User;
}

// TrackBy for ngFor
@Component({
  selector: 'app-user-list',
  template: `
    <div *ngFor="let user of users; trackBy: trackByUserId">
      <app-user-card [user]="user"></app-user-card>
    </div>
  `
})
export class UserListComponent {
  users: User[] = [];

  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}

// Lazy Loading Routes
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module')
      .then(m => m.AdminModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module')
      .then(m => m.DashboardModule)
  }
];

// Preloading Strategy
import { PreloadAllModules } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ]
})
export class AppRoutingModule { }

// Virtual Scrolling
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-virtual-list',
  template: `
    <cdk-virtual-scroll-viewport itemSize="50" class="viewport">
      <div *cdkVirtualFor="let item of items" class="item">
        {{ item }}
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  styles: [`
    .viewport {
      height: 400px;
      width: 100%;
    }
  `]
})
export class VirtualListComponent {
  items = Array.from({length: 10000}, (_, i) => `Item #${i}`);
}`,
    quiz: {
      question: "What does the OnPush change detection strategy do?",
      options: [
        "Pushes changes to the server",
        "Only checks for changes when inputs change or events fire",
        "Disables change detection",
        "Checks for changes more frequently"
      ],
      correctAnswer: 1,
      explanation: "OnPush strategy only triggers change detection when input properties change or events are fired from the component."
    }
  }
];

export const categories = Array.from(new Set(lessons.map(l => l.category)));
