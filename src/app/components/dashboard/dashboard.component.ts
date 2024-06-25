import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dropdownVisible: boolean = false;
  showChangePasswordForm: boolean = false; 
  

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart() {
    const chartElement = document.getElementById('priorityChart') as HTMLCanvasElement;
    if (chartElement) {
      const ctx = chartElement.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['High', 'Low', 'Normal'],
            datasets: [{
              label: 'Tasks',
              data: [2, 4, 9],
              backgroundColor: '#846cf7',
              borderColor: '#846cf7',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    }
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
    
  }

  onProfileClick(event: Event) {
    event.preventDefault();
    console.log('Profile clicked');
    // Add your profile click logic here
  }

  onChangePasswordClick(event: Event) {
    event.preventDefault();
    console.log('Change Password clicked');
    // Toggle the visibility of change password form
    this.router.navigate(['/change-password']); // Example navigation
    this.showChangePasswordForm = true;
  }

  onLogoutClick(event: Event) {
    event.preventDefault();
    console.log('Logout clicked');
    this.logout();
  }

  logout() {
    // Remove authentication token
    localStorage.removeItem('authToken');

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
